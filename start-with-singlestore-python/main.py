import sys
import traceback
from memsql.common import database

# main is called at the bottom
def main():

  # TODO: pull from config
  HOST = 'svc-9b7ada2b-bfbb-48de-b41f-ce66e2827760-dml.azr-pune-1.svc.singlestore.com'
  PORT = 3306
  USER = 'admin'
  PASSWORD = 'Devpost#123'
  DATABASE = 'cropdb'

  conn = database.connect(host=HOST, port=PORT, user=USER, password=PASSWORD, database=DATABASE)

  try:

    conn.ping()

    rows = read_all(conn)
    print("All rows:")
    for row in rows:
      print(row, sep ='\t')
      
  except Exception as e:
    print("Error")
    print(e)
    traceback.print_exc(file =sys.stdout)

  finally:
    conn.close()

def read_all(conn):
  sql = "SELECT * FROM croprecommend"
  rows = conn.query(sql)
  return rows

if __name__ == '__main__':
  main()
