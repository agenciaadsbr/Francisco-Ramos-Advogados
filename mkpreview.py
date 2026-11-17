import re, base64, shutil, os
src='/home/claude/fr'; dst='/home/claude/fr-preview'
shutil.rmtree(dst, ignore_errors=True); os.makedirs(dst)
for f in ['index.html','redirect.html','app.js']: shutil.copy(f'{src}/{f}', dst)
shutil.copytree(f'{src}/assets', f'{dst}/assets')
d=base64.b64encode(open(f'{src}/assets/fonts/display.woff2','rb').read()).decode()
s_=base64.b64encode(open(f'{src}/assets/fonts/sans.woff2','rb').read()).decode()
for f in ['index.html','redirect.html']:
    p=f'{dst}/{f}'; s=open(p).read()
    s=s.replace('"/assets/','"assets/').replace(' /assets/',' assets/').replace(', /assets/',', assets/').replace('src="/app.js"','src="app.js"')
    s=s.replace('url(/assets/fonts/display.woff2)','url(data:font/woff2;base64,'+d+')').replace('url(/assets/fonts/sans.woff2)','url(data:font/woff2;base64,'+s_+')')
    s=re.sub(r'<link rel="preload" href="assets/fonts/[^"]+" as="font"[^>]*>\n?','',s)
    s=s.replace('<meta property="og:image" content="assets/og.jpg">','')
    if f=='index.html':
        s=s.replace('<body class="no-js">','<body class="no-js"><div style="position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:99;background:#071830;color:#E8ECF2;font:600 12px/1.3 Geist,system-ui,sans-serif;padding:8px 14px;border-radius:999px;border:1px solid rgba(194,158,98,.5);pointer-events:none">Prévia · o formulário não envia leads</div>',1)
    open(p,'w').write(s)
a=open(f'{dst}/app.js').read()
a=a.replace("  function insert(table, row) {\n","  function insert(table, row) {\n    return Promise.resolve({ ok: true }); /* prévia: sem envio */\n",1).replace("location.href = '/redirect' + location.search;","location.href = 'redirect.html';")
open(f'{dst}/app.js','w').write(a); print('preview ok')
