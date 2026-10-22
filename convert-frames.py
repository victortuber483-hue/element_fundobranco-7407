from pathlib import Path
from PIL import Image, ImageOps
from concurrent.futures import ThreadPoolExecutor

source = Path('/home/user/reference-vfskill/packages/web/public')
target = Path('/home/user/silver-universe/packages/web/public')
lut = [round(251 - 146 * (i / 255) ** 0.87) for i in range(256)]

def convert(path):
    gray = ImageOps.grayscale(Image.open(path)).point(lut)
    image = Image.merge('RGB', (gray.point(lambda p: max(0, p - 2)), gray.point(lambda p: max(0, p - 1)), gray))
    image.save(target / path.relative_to(source), 'WEBP', quality=88, method=4)

for folder in ['frames', 'frames-mobile']:
    (target / folder).mkdir(parents=True, exist_ok=True)
    with ThreadPoolExecutor(max_workers=6) as pool:
        list(pool.map(convert, sorted((source / folder).glob('*.webp'))))
    print(folder, len(list((target / folder).glob('*.webp'))))