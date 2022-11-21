import json
import urllib
import boto3

adx = boto3.client('dataexchange', region_name='us-east-1')

def lambda_handler(event,context):
    
    startdate = "2021-01-01T00:00:00Z"
    enddate = "2022-11-01T00:00:00Z"
    intersectsWKT = ""
    event = event['queryStringParameters']
    if "startdate" in event and event["startdate"] != "":
        startdate = event["startdate"]
    
    if "enddate" in event and event["enddate"] != "":
        enddate = event["enddate"]
        
    if "area" in event and event["area"] != "":
        area = event["area"]
        intersectsWKT = "intersectsWKT: \""+ area + "\""
    
    body =  "{ursa_udp_availablemetadatarecord( \
        header:{ commonProperties:{imageBoundsGeoJsonPolygon:{"+ intersectsWKT +"}}} \
        limit: 2000 \
        sortBy: { field: \"content.catalogProperties.startTimeUTC\", sortOrder: \"ASC\" } \
        content: { catalogProperties: { \
            startTimeUTC: { gt: \"" + startdate + "\" lt: \"" + enddate + "\" } \
            vendor: { eq: \"ICEYE\" } \
            passType:{eq: \"DESCENDING\"} \
            antennaPointing:{eq: \"LEFT\"} \
            acquisitionMode:{eq:\"ICE_SPOTLIGHT\"} \
        } } ) { assignedId\n    uploadTime\n    header {\n      version\n      commonProperties {\n        sourceVendor\n        startTimeUTC\n        endTimeUTC\n      }\n    } \
        content {\n      version\n      catalogProperties {\n        quicklookUrl\n        wktPolygon\n        geoJsonPolygon {\n          type\n          coordinates\n        }\n   vendor\n   startTimeUTC\n    endTimeUTC\n  passType\n        acquisitionMode\n        incidence {\n          incidenceNearDegs\n          incidenceFarDegs\n        }\n        collectionPlatform\n        antennaPointing\n }\n } \
    }}"
    
    
    paginationInfo = []
    polygons = []
    
    adx_response=adx.send_api_asset(
        DataSetId="XXXXXXXXXXXXXXXXXXXXXX",
        RevisionId="XXXXXXXXXXXXXXXXXXXXXX",
        AssetId="XXXXXXXXXXXXXXXXXXXXXX",
        Method="POST",
        Path="/psdm/graphql",
        Body=body
    )
    adx_body = json.loads(adx_response["Body"])
    raw_data = adx_body['data']['ursa_udp_availablemetadatarecord']
    paginationInfo = adx_body['paginationInfo']
    
    if raw_data is not None:
        for polygon in raw_data:
            coordinates = json.loads(polygon['content']['catalogProperties']['geoJsonPolygon']['coordinates'])
            alt_coordinates = [[coordinate[1], coordinate[0]] for coordinate in coordinates[0]]
            center = [(alt_coordinates[0][0] + alt_coordinates[2][0])/2, (alt_coordinates[0][1] + alt_coordinates[2][1])/2]
            polygons.append({
                "id": polygon['assignedId'],
                "center": center,
                "coordinates": alt_coordinates,
                "startTimeUTC": polygon['content']['catalogProperties']['startTimeUTC'],
                "quicklookUrl": polygon['content']['catalogProperties']['quicklookUrl'],
                "passType": polygon['content']['catalogProperties']['passType'],
                "antennaPointing": polygon['content']['catalogProperties']['antennaPointing']
                
            })
    
    data = {
        "data": polygons,
        "paginationInfo": paginationInfo
    }
    
    res = {
        "isBase64Encoded": True,
        "statusCode": 200,
        "headers": {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": True,
        },
        "body": json.dumps(data)
    }
    
    return res
