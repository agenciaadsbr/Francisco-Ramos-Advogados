import json, math
m=json.load(open('map.json'))
W,H=m['W'],m['H']; c=m['cent']
L=c['Limeira']
targets=['Cordeirópolis','Iracemápolis','Piracicaba']
fills={'hq':'#C29E62','c':'#1E3556','in':'#152844','out':'#0F1E35'}
parts=[f'<svg class="fr-map" viewBox="0 0 {W:.0f} {H:.0f}" role="img" aria-labelledby="fr-map-t"><title id="fr-map-t">Mapa da região de Limeira: sede em Limeira e atendimento em Piracicaba, Iracemápolis, Cordeirópolis e municípios próximos, em um raio aproximado de 40 km</title>',
 '<defs><radialGradient id="fr-glow"><stop offset="0" stop-color="#C29E62" stop-opacity=".35"/><stop offset="1" stop-color="#C29E62" stop-opacity="0"/></radialGradient></defs>',
 '<g class="mun">']
for cls,n,d in m['paths']:
    parts.append(f'<path class="m-{cls}" d="{d}"><title>{n}</title></path>')
parts.append('</g>')
parts.append(f'<circle cx="{L[0]:.0f}" cy="{L[1]:.0f}" r="{m["r40"]:.0f}" class="r40"/>')
parts.append(f'<circle cx="{L[0]:.0f}" cy="{L[1]:.0f}" r="90" fill="url(#fr-glow)"/>')
# small dots for other municipalities inside radius
for n in m['inside']:
    x,y=c[n]; parts.append(f'<circle class="dot-s" cx="{x:.0f}" cy="{y:.0f}" r="2.4"/>')
# arcs
for i,t in enumerate(targets):
    x,y=c[t]; mx,my=(L[0]+x)/2,(L[1]+y)/2
    dx,dy=x-L[0],y-L[1]; dist=math.hypot(dx,dy)
    nx,ny=-dy/dist,dx/dist; bend=dist*0.32
    cx_,cy_=mx+nx*bend,my+ny*bend
    if cy_>my: cx_,cy_=mx-nx*bend,my-ny*bend  # bow upward
    parts.append(f'<path class="arc" style="--d:{.2+i*.25}s" d="M{L[0]:.0f},{L[1]:.0f} Q{cx_:.0f},{cy_:.0f} {x:.0f},{y:.0f}"/>')
    parts.append(f'<circle class="dot" style="--d:{1.0+i*.25}s" cx="{x:.0f}" cy="{y:.0f}" r="5"/>')
parts.append(f'<circle class="pulse" cx="{L[0]:.0f}" cy="{L[1]:.0f}" r="9"/><circle class="hqdot" cx="{L[0]:.0f}" cy="{L[1]:.0f}" r="5.5"/>')
# labels
lab={'Cordeirópolis':(0,-14,'middle'),'Iracemápolis':(-12,4,'end'),'Piracicaba':(0,24,'middle')}
for t,(ox,oy,a) in lab.items():
    x,y=c[t]; parts.append(f'<text class="lbl" x="{x+ox:.0f}" y="{y+oy:.0f}" text-anchor="{a}">{t}</text>')
parts.append('</svg>')
s=''.join(parts)
open('map.svg.html','w').write(s); print(len(s), W, H, L)
