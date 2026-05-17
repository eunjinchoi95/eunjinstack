import fitz
import os

pdf_dir = "docs/프로젝트 상세"
out_dir = "src/assets/project_details"
os.makedirs(out_dir, exist_ok=True)

for file in os.listdir(pdf_dir):
    if file.endswith(".pdf"):
        pdf_path = os.path.join(pdf_dir, file)
        doc = fitz.open(pdf_path)
        base_name = os.path.splitext(file)[0]
        
        img_count = 0
        for i in range(len(doc)):
            page = doc[i]
            image_list = page.get_images(full=True)
            for img_index, img in enumerate(image_list):
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]
                
                # Filter out small icons/logos
                if len(image_bytes) > 10000:
                    image_name = f"{base_name}_{img_count}.{image_ext}"
                    with open(os.path.join(out_dir, image_name), "wb") as f:
                        f.write(image_bytes)
                    img_count += 1
                    print(f"Extracted: {image_name}")
