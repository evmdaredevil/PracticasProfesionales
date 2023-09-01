import os
import geopandas as gpd

def convert_shp_to_geojson(shp_file):
    try:
        # Read the shapefile
        gdf = gpd.read_file(shp_file)
        
        # Create the output GeoJSON file name
        geojson_file = shp_file.replace('.shp', '.geojson')
        
        # Write to GeoJSON
        gdf.to_file(geojson_file, driver='GeoJSON')
        
        print(f"Converión exitosa, se generó el arhcivo: '{geojson_file}'.")
    except Exception as e:
        print("Error:", e)

def convert_shp_files_in_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.shp'):
                shp_file = os.path.join(root, file)
                convert_shp_to_geojson(shp_file)

if __name__ == "__main__":
    directory = input("Escribe el directorio que contine los archivos .shp: ")
    
    if not os.path.exists(directory):
        print("El directorio NO existe.")
    else:
        convert_shp_files_in_directory(directory)
