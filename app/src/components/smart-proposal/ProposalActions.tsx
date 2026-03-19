import { Download, MessageCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

interface ProposalActionsProps {
  customerName: string;
  systemSize: number;
  onDownloadPdf: () => void;
  onNewProposal: () => void;
}

export function ProposalActions({ customerName, systemSize, onDownloadPdf, onNewProposal }: ProposalActionsProps) {
  const whatsappMessage = encodeURIComponent(
    `Hola! Te comparto mi propuesta solar personalizada de Solari Argentina.\n\nCliente: ${customerName || 'N/A'}\nSistema: ${systemSize} kWp\n\nContactanos para mas informacion.`
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  return (
    <div className="sticky bottom-0 z-40 mt-8 -mx-6 -mb-6 px-6 py-4 glass border-t border-white/5 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          variant="primary"
          size="md"
          icon={<Download className="w-4 h-4" />}
          onClick={onDownloadPdf}
        >
          Descargar PDF
        </Button>

        <Button
          variant="amber"
          size="md"
          icon={<MessageCircle className="w-4 h-4" />}
          onClick={() => window.open(whatsappUrl, '_blank')}
          className="!bg-gradient-to-r !from-green-500 !to-green-600 hover:!from-green-400 hover:!to-green-500 !shadow-green-500/20"
        >
          Compartir WhatsApp
        </Button>

        <Button
          variant="ghost"
          size="md"
          icon={<RefreshCw className="w-4 h-4" />}
          onClick={onNewProposal}
        >
          Nueva propuesta
        </Button>
      </div>
    </div>
  );
}
