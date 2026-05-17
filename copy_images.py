import os
import shutil

mappings = {
    "docs/프로젝트 상세/신세계라이브쇼핑": "shinsegae_usr_",
    "docs/프로젝트 상세/2024 상반기 시스템 고도화 - 프로젝트팀": "hns_2024_usr_",
    "docs/프로젝트 상세/IT시스템 리뉴얼 - 상품물류정산팀": "hns_it_usr_"
}

dest_dir = "src/assets/project_details"
os.makedirs(dest_dir, exist_ok=True)

for src_dir, prefix in mappings.items():
    if os.path.exists(src_dir):
        for file in os.listdir(src_dir):
            if os.path.isfile(os.path.join(src_dir, file)):
                safe_name = file.replace(" ", "_").replace("(", "").replace(")", "")
                new_name = prefix + safe_name
                shutil.copy2(os.path.join(src_dir, file), os.path.join(dest_dir, new_name))
                print(f"Copied: {new_name}")
