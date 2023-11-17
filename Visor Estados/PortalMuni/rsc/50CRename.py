import os

def rename_long_filenames(directory):
    for root, _, files in os.walk(directory):
        for filename in files:
            full_path = os.path.join(root, filename)
            if len(filename) > 50:
                name, extension = os.path.splitext(filename)
                new_name = name[:50] + extension
                new_full_path = os.path.join(root, new_name)
                os.rename(full_path, new_full_path)
                print(f"Renamed: {full_path} to {new_full_path}")

if __name__ == "__main__":
    directory = r'C:\Practicas\Municipios' 
    rename_long_filenames(directory)
