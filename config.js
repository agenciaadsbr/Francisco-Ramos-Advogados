// Configuração pública do painel /dashboard. A chave anon do Supabase é pública por design:
// o RLS só permite INSERT anônimo em lp_leads/lp_visits; a leitura exige login (lp_acessos).
window.LP_CONFIG = {
  site: 'francisco-ramos-criminal',
  sites: ['francisco-ramos-criminal'],
  cliente: 'Francisco Ramos Advogados',
  supabaseUrl: 'https://qxhnjzyhtllmtdrcyygi.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4aG5qenlodGxsbXRkcmN5eWdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMzczNjgsImV4cCI6MjA5NzgxMzM2OH0.DWf4I_x9F--H7ZZHUt_n4V3B__Nlsf1jNZdUV0vNBLU'
};
