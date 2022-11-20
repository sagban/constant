import json
import urllib
import boto3

adx = boto3.client('dataexchange', region_name='us-east-1')

def lambda_handler(event,context):
    
    body =  "{\n  ursa_udp_availablemetadatarecord(\n limit: 10\n sortBy: {\n      field: \"content.catalogProperties.startTimeUTC\",\n      sortOrder: \"ASC\"\n    }\n     content: { catalogProperties: { vendor: { eq: \"ICEYE\" } passType:{eq: \"DESCENDING\"} antennaPointing:{eq: \"RIGHT\"} acquisitionMode:{eq:\"ICE_SPOTLIGHT\"} } }\n  ) {\n    assignedId\n    uploadTime\n    header {\n      version\n      commonProperties {\n        sourceVendor\n        startTimeUTC\n        endTimeUTC\n      }\n    }\n    content {\n      version\n      catalogProperties {\n        quicklookUrl\n        wktPolygon\n        geoJsonPolygon {\n          type\n          coordinates\n        }\n        vendor\n        startTimeUTC\n        endTimeUTC\n        passType\n        acquisitionMode\n        incidence {\n          incidenceNearDegs\n          incidenceFarDegs\n        }\n        collectionPlatform\n        antennaPointing\n      }\n    }\n  }\n}\n"


    adx_response=adx.send_api_asset(
        DataSetId="XXXXXXXXXXXXXXXXXXX",
        RevisionId="XXXXXXXXXXXXXXXXXXX",
        AssetId="XXXXXXXXXXXXXXXXXXX",
        Method="POST",
        Path="/psdm/graphql",
        Body=body
    )
    adx_body = json.loads(adx_response["Body"])
    raw_data = adx_body['data']['ursa_udp_availablemetadatarecord']
    paginationInfo = adx_body['paginationInfo']
    polygons = []
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
    
    return data
