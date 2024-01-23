from owslib.wms import WebMapService

def get_layers(workspace, geoserver_url='http://localhost:8080/geoserver/'):
    wms = WebMapService(geoserver_url + 'wms', version='1.1.1')

    # Get all layers in the specified workspace
    layers = [layer for layer in wms.contents if layer.startswith(workspace + ':')]

    return layers

if __name__ == '__main__':
    workspace_name = 'Analisis'
    layers = get_layers(workspace_name)

    if layers:
        print(f'Layers in workspace {workspace_name}:')
        for layer in layers:
            print(layer)
    else:
        print(f'No layers found in workspace {workspace_name}.')
