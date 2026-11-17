import json
import re, hashlib, os
def bust(h):
    def rep(m):
        u=m.group(1); f=u.lstrip('/')
        if not os.path.isfile(f): return m.group(0)
        return u+'?v='+hashlib.md5(open(f,'rb').read()).hexdigest()[:8]
    return re.sub(r"""(/(?:assets/[^"'\s)?]+|app\.js|config\.js))(?![?\w])""", rep, h)
t=open('src/index.template.html').read()
logo=open('logo_inner.txt').read()
mp=open('map.svg.html').read()
m=json.load(open('map.json')); L=m['cent']['Limeira']
t=t.replace('{{LOGO}}',logo).replace('{{MAP}}',mp).replace('{{TAGX}}',f"{L[0]/m['W']*100:.1f}").replace('{{TAGY}}',f"{L[1]/m['H']*100:.1f}")
t=bust(t); open('index.html','w').write(t); print(len(t))
r=open('src/redirect.template.html').read().replace('{{LOGO}}',logo)
r=bust(r); open('redirect.html','w').write(r); print('redirect',len(r))
