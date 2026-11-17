# LP Francisco Ramos Advogados — Direito Criminal

Landing page estática (HTML/CSS/JS, sem build) no padrão ADS BR, para Google Ads. Vercel: projeto `francisco-ramos-advogados` (deploy automático a cada push na `main`). Embutida no WordPress do cliente via iframe.

| Arquivo | Função |
|---|---|
| `index.html` | LP completa (CSS inline, logo e mapa SVG inline). Gerada por `build.py` a partir de `src/index.template.html` |
| `redirect.html` | `/redirect`: contador de 3 s e abertura do WhatsApp (5519974074960) |
| `app.js` | Visitas, leads, UTMs, validação, animações (split text, reveal, parallax, cards empilhados, spotlight, botões magnéticos, FAQ, contadores) |
| `assets/` | Fontes (Bricolage Grotesque + Geist, OFL), fotos WebP, logo, favicon, og.jpg |
| `vercel.json` | `cleanUrls`, cache longo em `/assets`, `noindex` no `/redirect` |

## Leads
`INSERT` em `lp_leads` (Supabase ADS BR CLIENTES `qxhnjzyhtllmtdrcyygi`, `site = 'francisco-ramos-criminal'`) com `origem` (UTMs/gclid/referrer) e `servico` (área do CTA clicado). Visitas em `lp_visits`. Uma nova tentativa automática se a gravação falhar.

## Painel de leads

`/dashboard` — usuário **Admin**, senha **12345** (Supabase Auth: `admin@francisco-ramos-criminal.adsbr.internal`, acesso em `lp_acessos` site `francisco-ramos-criminal`). Página com noindex.

## Editar
Altere `src/*.template.html` e rode `python3 build.py` (insere o logo e o mapa). O mapa vem de `mkmap.py` + `mksvg.py` (malha municipal IBGE via tbrugz/geodata-br).

## Imagens
Fotografias licenciadas do Freepik (plano ADS BR, sem IA): 6278833 (hero), 420985774 (situações), 27507044 (flagrante), 26265771 (inquérito), 25777353 (execução), 426492714 (escritório). Logo vetorizado do arquivo oficial do escritório, sem alterações no desenho.

## Antes de veicular
- [ ] Número da OAB/SP de Francisco Ramos (procure `data-pendente`).
- [ ] Foto profissional de Francisco Ramos para a seção do escritório (substituir `escritorio-*.webp`).
- [ ] Tag do Google Ads: global em `index.html` e `redirect.html`; conversão só no `redirect.html`.
