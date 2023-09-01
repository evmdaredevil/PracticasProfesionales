import sys
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

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Intrucciones: python script.py input.shp")
    else:
        shp_file = sys.argv[1]
        if shp_file.endswith('.shp'):
            convert_shp_to_geojson(shp_file)
        else:
            print("Ingresa un archivo '.shp'.")
