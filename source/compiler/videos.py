import cv2
import os
import json

def generate_video_thumbnails(video_dir, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    manifest = []
    
    for filename in os.listdir(video_dir):
        if filename.endswith((".mp4", ".mov", ".avi")):
            video_path = os.path.join(video_dir, filename)
            thumb_name = f"{os.path.splitext(filename)[0]}_thumb.jpg"
            thumb_path = os.path.join(output_dir, thumb_name)

            # Captura o primeiro frame
            cap = cv2.VideoCapture(video_path)
            success, image = cap.read()
            if success:
                cv2.imwrite(thumb_path, image)
                manifest.append({
                    "video": f"/videos/{filename}",
                    "poster": f"/thumbs/{thumb_name}"
                })
            cap.release()
    
    # Salva um JSON intermediário para o seu script de build
    with open('video-manifest.json', 'w') as f:
        json.dump(manifest, f)

generate_video_thumbnails('./public/videos', './public/thumbs')