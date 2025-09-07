import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'avatar' | 'button';
  count?: number;
}

export const LoadingSkeleton = ({ 
  className, 
  variant = 'text', 
  count = 1 
}: LoadingSkeletonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'card':
        return 'h-48 w-full';
      case 'text':
        return 'h-4 w-full';
      case 'avatar':
        return 'h-10 w-10 rounded-full';
      case 'button':
        return 'h-10 w-24';
      default:
        return 'h-4 w-full';
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'skeleton',
            getVariantClasses(),
            className
          )}
        />
      ))}
    </>
  );
};

export const ChatSkeleton = () => (
  <div className="space-y-4">
    <div className="flex justify-end">
      <LoadingSkeleton className="h-12 w-3/4 rounded-lg" />
    </div>
    <div className="flex justify-start">
      <LoadingSkeleton className="h-16 w-5/6 rounded-lg" />
    </div>
  </div>
);

export const CategoryGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <LoadingSkeleton key={index} variant="card" className="rounded-xl" />
    ))}
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <LoadingSkeleton className="h-8 w-48" />
      <LoadingSkeleton variant="button" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <LoadingSkeleton key={index} className="h-24 rounded-lg" />
      ))}
    </div>
    <LoadingSkeleton className="h-96 rounded-lg" />
  </div>
);