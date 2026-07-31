from PIL import Image

OUT = "/app/frontend/src/assets/planets"
NAMES = ["water", "wood", "fire", "earth", "metal"]
THRESH = 48

for name in NAMES:
    p = f"{OUT}/{name}.png"
    im = Image.open(p).convert("RGB")
    W, H = im.size
    gray = im.convert("L")
    px = gray.load()
    step = 2
    colcnt = [0] * W
    rowcnt = [0] * H
    for y in range(0, H, step):
        for x in range(0, W, step):
            if px[x, y] > THRESH:
                colcnt[x] += 1
                rowcnt[y] += 1
    col_need = 0.16 * (H / step)
    row_need = 0.16 * (W / step)
    xs = [x for x in range(W) if colcnt[x] > col_need]
    ys = [y for y in range(H) if rowcnt[y] > row_need]
    if not xs or not ys:
        print("skip", name); continue
    minx, maxx = min(xs), max(xs)
    miny, maxy = min(ys), max(ys)
    cx = (minx + maxx) / 2
    cy = (miny + maxy) / 2
    side = int(max(maxx - minx, maxy - miny) * 1.0)
    half = side // 2
    left, top = int(cx - half), int(cy - half)
    right, bottom = left + side, top + side
    canvas = Image.new("RGB", (side, side), (4, 6, 14))
    sl, st = max(left, 0), max(top, 0)
    sr, sb = min(right, W), min(bottom, H)
    canvas.paste(im.crop((sl, st, sr, sb)), (sl - left, st - top))
    canvas.resize((640, 640), Image.LANCZOS).save(p)
    print("centered", name, "x", (minx, maxx), "y", (miny, maxy), "side", side)

print("done")
