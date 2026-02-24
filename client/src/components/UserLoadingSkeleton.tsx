const UserLoadingSkeleton = () => {
  // Create an array of 6 items for skeleton skeleton items
  const skeletonContacts = Array(6).fill(null);

  return (
    <div className="flex-1 w-full overflow-y-auto">
      {skeletonContacts.map((_, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 p-3 w-full animate-pulse transition-colors hover:bg-base-200/50"
        >
          {/* Avatar Skeleton */}
          <div className="relative mx-auto lg:mx-0">
            <div className="w-12 h-12 rounded-full bg-base-100/60" />
          </div>

          {/* User Info Skeleton (hidden on smaller screens if you have a condensed sidebar) */}
          <div className="hidden lg:block text-left min-w-0 flex-1">
            <div className="h-4 w-24 bg-base-100/60 rounded mb-2" />
            <div className="h-3 w-16 bg-base-100/40 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserLoadingSkeleton;
