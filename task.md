# Fundo branco e prata
- [x] Direção final confirmada: branco pérola predominante com grade/rastros prata mais presentes. Reverter cenário 3D rejeitado pelo usuário; manter só estrutura e ritmo originais.
- [x] Removidos planos, nuvens, partículas, horizonte e paralaxe. Grade original 90px, máximo 1100px, seis rastros, 16s de drift e tempos originais dos rastros; paleta/contraste ajustados. Marca d’água permanece removida.
- [x] Build/lint aprovados. Chrome desktop/mobile: dimensões, duração, movimento, zero transformações/canvas/quadros/badge/overflow/erros verificados. Reduced-motion e screenshots verificados.

## Histórico (versões anteriores substituídas)
- [x] Refinamento pedido: grade em perspectiva 3D com três planos, luz/nuvens prata em movimento, 24 partículas, rastros e paralaxe de mouse/scroll. Fundo fixo sem portal nem conteúdo.
- [x] Remover marca d’água Runable a pedido explícito; analytics e AgentFeedback preservados.
- [x] Build/lint e testes desktop/mobile aprovados. Perspectiva e paralaxe verificadas, reduced-motion desativa movimento, sem badge/erros/overflow. Screenshots inspecionados.
- [x] Correção do usuário: fundo correto é `.bio-grid` na área dos cards, não o portal. Pedido anterior interpretado incorretamente.
- [x] Substituir portal por grade original 90px / 1100px, máscara, seis rastros e tempos originais, em branco/prata. Sem novas mídias geradas.
- [x] Build/lint aprovados. Chrome desktop/mobile: zero canvas ou requisições de quadros; seis rastros e grade em movimento; sem overflow/erros. Reduced-motion verificado. Screenshots inspecionados.
- [x] Manter apenas prévia, original inalterado e sem publicação.

## Histórico da primeira versão (substituída)
- [x] Aprovação: somente fundo, animação ao rolar, sem publicação.
- [x] Cópia local de VFSKILL-9937, original intacto.
- [x] Projeto gerenciado criado e direção visual documentada.
- [x] Converter 144 quadros desktop + 144 mobile para branco/prata, preservando camadas.
- [x] Adaptar CosmicScene e página sem conteúdo, avanço/recuo por scroll.
- [x] Build, typecheck e lint aprovados. Chrome desktop/mobile: quadros 0 → 72 → 143 → 0, 144 assets carregados, sem erros ou overflow. Reduced motion estático e sem scroll.
- [x] Screenshots desktop/mobile inspecionados.
- [ ] Entregar prévia, sem publicar.