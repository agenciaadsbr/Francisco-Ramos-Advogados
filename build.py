import json
t=open('src/index.template.html').read()
logo=open('logo_inner.txt').read()
mp=open('map.svg.html').read()
m=json.load(open('map.json')); L=m['cent']['Limeira']
t=t.replace('{{LOGO}}',logo).replace('{{MAP}}',mp).replace('{{TAGX}}',f"{L[0]/m['W']*100:.1f}").replace('{{TAGY}}',f"{L[1]/m['H']*100:.1f}")
open('index.html','w').write(t); print(len(t))
r=open('src/redirect.template.html').read().replace('{{LOGO}}',logo)
open('redirect.html','w').write(r); print('redirect',len(r))
