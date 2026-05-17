import os
from PIL import Image

def convert_to_webp(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                input_path = os.path.join(root, file)
                output_path = os.path.splitext(input_path)[0] + '.webp'
                
                # Skip if already exists
                if os.path.exists(output_path):
                    print(f"Skipping {file}, webp already exists.")
                    continue
                
                try:
                    with Image.open(input_path) as img:
                        img.save(output_path, 'WEBP', quality=85)
                        print(f"Converted {file} to WebP.")
                        # We won't delete originals here for safety, just provide the tool
                except Exception as e:
                    print(f"Failed to convert {file}: {e}")

if __name__ == "__main__":
    assets_path = r"E:\develop\heroStack\src\assets"
    convert_to_webp(assets_path)
