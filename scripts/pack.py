import os
import zipfile

def pack():
    dist_dir = 'dist'
    zip_path = 'deploy.zip'
    
    if not os.path.exists(dist_dir):
        print(f"Error: '{dist_dir}' directory not found. Please run 'npm run build' first.")
        return

    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(dist_dir):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, dist_dir)
                zipf.write(full_path, rel_path)

    size_kb = os.path.getsize(zip_path) / 1024
    print(f"✓ Successfully created '{zip_path}' ({size_kb:.1f} KB). Ready to upload to Bluehost!")

if __name__ == '__main__':
    pack()
