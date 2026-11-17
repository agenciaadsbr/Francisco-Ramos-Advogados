import json, math
from shapely.geometry import shape, box, Point
from shapely.ops import transform
d=json.load(open('/tmp/sp.json'))
LON0,LAT0=-47.401,-22.564  # Limeira approx
k=math.cos(math.radians(LAT0))
# km projection centered on Limeira
def proj(x,y,z=None): return ((x-LON0)*111.32*k, -(y-LAT0)*110.57)
R=62 # km half-width shown
win=box(-R*1.25,-R*0.95,R*1.25,R*0.95)
feats=[]
for f in d['features']:
    g=transform(proj,shape(f['geometry']))
    if g.intersects(win.buffer(5)):
        feats.append((f['properties']['name'],g))
print(len(feats))
S=4.0 # px per km
W,H=win.bounds[2]-win.bounds[0],win.bounds[3]-win.bounds[1]
ox,oy=-win.bounds[0],-win.bounds[1]
def pth(g):
    g=g.simplify(0.35,preserve_topology=True)
    polys=[g] if g.geom_type=='Polygon' else list(g.geoms)
    out=[]
    for p in polys:
        for ring in [p.exterior]+list(p.interiors):
            pts=list(ring.coords)
            out.append('M'+' '.join(f"{round((x+ox)*S,1):g},{round((y+oy)*S,1):g}" for x,y in pts)+'Z')
    return ''.join(out)
named={'Limeira':'hq','Piracicaba':'c','Iracemápolis':'c','Cordeirópolis':'c'}
cent={}
paths=[]
lim=[g for n,g in feats if n=='Limeira'][0]
lc=lim.representative_point() if False else lim.centroid
for n,g in feats:
    dist=g.centroid.distance(lc)
    cls='hq' if n=='Limeira' else ('c' if n in named else ('in' if dist<=40 else 'out'))
    paths.append((cls,n,pth(g)))
    cent[n]=((g.centroid.x+ox)*S,(g.centroid.y+oy)*S)
print({n:(round(c[0]),round(c[1])) for n,c in cent.items() if n in named})
# others within 40km (for small dots)
inside=[n for n,g in feats if g.centroid.distance(lc)<=40 and n not in named]
print('inside',inside)
json.dump({'W':W*S,'H':H*S,'paths':paths,'cent':{n:cent[n] for n in cent},'inside':inside,'r40':40*S},open('map.json','w'),ensure_ascii=False)
