const fs = require('fs');
let content = fs.readFileSync('d:/Downloads/ein-code-digital-lab/components/projects-grid.tsx', 'utf8');

// Add imports
content = content.replace('import { Box, Zap', 'import { Package, Gauge, Banknote, AlertTriangle, Check, Box, Zap');

// InventoryMockup
content = content.replace(/📦/g, '<Package className="w-3 h-3 text-white/80" />');

// AnprMockup
content = content.replace(/<div className="text-4xl select-none">🚗<\/div>/g, '<div className="w-10 h-10 flex items-center justify-center"><Car className="w-full h-full text-white/80" /></div>');
content = content.replace(/'✓ Registered'/g, "'✓ Registered'"); // Will replace ✓ below

// DrivixMockup
content = content.replace(/🚗/g, '<Car className="w-5 h-5 text-white/80" />');
content = content.replace(/'🏎'/g, '<Gauge className="w-3 h-3 text-white/80" />');
content = content.replace(/'⚡'/g, '<Zap className="w-3 h-3 text-white/80" />');
content = content.replace(/'💰'/g, '<Banknote className="w-3 h-3 text-white/80" />');
content = content.replace(/'✓'/g, '<Check className="w-2.5 h-2.5" />');
content = content.replace(/'⚠'/g, '<AlertTriangle className="w-2.5 h-2.5" />');

// MetroMockup and SepsisMockup
content = content.replace(/⚠/g, '<AlertTriangle className="w-3 h-3 inline-block mr-1 text-amber-400" />');
content = content.replace(/✓/g, '<Check className="w-3 h-3 inline-block mr-1 text-emerald-400" />');

fs.writeFileSync('d:/Downloads/ein-code-digital-lab/components/projects-grid.tsx', content);
console.log("Updated mockups");
