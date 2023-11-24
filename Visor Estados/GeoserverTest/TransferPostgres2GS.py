from geoserver.catalog import Catalog

# GeoServer 
geoserver_url = "http://localhost:8080/geoserver/rest"
geoserver_user = "admin"
geoserver_pass = "cenapred"

# Postgres
db_host = "localhost"
db_port = "5433"
db_name = "PortalMuni"
db_user = "postgres"
db_password = "cenapred"

# Workspace
workspace_name = "TestSpace"
store_name = "YourStore"
layer_name = "agebs"
cat = Catalog(geoserver_url, geoserver_user, geoserver_pass)

workspace = cat.get_workspace(workspace_name)
if not workspace:
    cat.create_workspace(workspace_name, uri="http://Cenapred")

store = cat.get_store(store_name, workspace=workspace)
if not store:
    ds = cat.create_datastore(store_name, workspace=workspace)
    ds.connection_parameters.update(
        host=db_host,
        port=db_port,
        database=db_name,
        user=db_user,
        passwd=db_password,
        dbtype="postgis",
    )
    cat.save(ds)

layer = cat.get_layer(layer_name, workspace=workspace)
if not layer:
    lyr = cat.publish_featuretype(layer_name, ds, "agebs", srs="EPSG:4326")
    cat.save(lyr)

print(f"Layer '{layer_name}' added successfully.")
