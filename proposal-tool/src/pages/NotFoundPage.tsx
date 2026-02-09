import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-6xl font-bold gradient-text mb-4">404</div>
        <p className="text-dark-400 mb-6">Page not found</p>
        <Button
          onClick={() => navigate('/')}
          icon={<Home className="w-4 h-4" />}
        >
          Go Home
        </Button>
      </motion.div>
    </div>
  );
}
