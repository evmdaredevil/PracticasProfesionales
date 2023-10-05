import os
import geopandas as gpd
from sqlalchemy import create_engine

# Directorio
directory_path = r'C:\Practicas\Municipios'

# Conexión a postgres
db_connection = {
    'host': 'localhost',
    'port': '5433',
    'dbname': 'PortalMuni',
    'user': 'postgres',
    'password': 'cenapred'
}

def upload_shapefile_to_postgresql(shapefile_path, engine, table_name):
    try:
        gdf = gpd.read_file(shapefile_path)
        gdf.columns = [col[:50] for col in gdf.columns]
        table_name = table_name[:63]
        gdf.to_postgis(table_name, engine, if_exists='replace', index=False)
        print(f'Shapefile {shapefile_path} uploaded to table {table_name} successfully.')
    except Exception as e:
        print(f'Error uploading {shapefile_path}: {e}')
pg_engine = create_engine(
    f"postgresql://{db_connection['user']}:{db_connection['password']}@{db_connection['host']}:{db_connection['port']}/{db_connection['dbname']}"
)

# Repite para el directorio y sub-directorios
for root, dirs, files in os.walk(directory_path):
    for file in files:
        if file.endswith('.shp'):
            shapefile_path = os.path.join(root, file)
            table_name = os.path.splitext(file)[0]
            
            upload_shapefile_to_postgresql(shapefile_path, pg_engine, table_name)
