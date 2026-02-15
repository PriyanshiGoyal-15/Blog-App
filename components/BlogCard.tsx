

interface BlogCardProps {
  blog: {
    _id: string;
    title: string;
    content: string;
    banner?: string;
    author: {
      name: string;
      email: string;
    };
    createdAt: string;
  };
  onDelete: (id: string) => void;
}

export default function BlogCard({ blog, onDelete }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Function to generate a deterministic color gradient based on valid seed characters
  const getGradient = (seed: string) => {
    // Simple hash function to get a number from string
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Generate two colors
    const c1 = `hsl(${Math.abs(hash) % 360}, 70%, 60%)`;
    const c2 = `hsl(${Math.abs(hash >> 8) % 360}, 70%, 40%)`;

    return `linear-gradient(135deg, ${c1}, ${c2})`;
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-2xl hover:shadow-zinc-900/50 hover:-translate-y-1">
      {/* Banner Image or Gradient */}
      <div className="aspect-video w-full overflow-hidden bg-zinc-800">
        {blog.banner ? (
          <img
            src={blog.banner}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="h-full w-full flex items-center justify-center"
            style={{ background: getGradient(blog.title || "blog") }}
          >
            <span className="text-4xl opacity-20 font-bold text-white">
              {blog.title?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4">
        {/* Title & Desc */}
        <div>
          <div className="flex justify-between items-start gap-4">
            <h2 className="text-xl font-bold bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent line-clamp-1 mb-2">
              {blog.title}
            </h2>
            <div className="flex gap-1 shrink-0">
              {/* simple edit/delete actions, can be improved with dropdown */}
              <button
                onClick={() => onDelete(blog._id)}
                className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-md transition-colors"
                title="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
              </button>
            </div>
          </div>
          <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed">
            {blog.content}
          </p>
        </div>

        {/* Footer: User & Date */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50 mt-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-300 ring-2 ring-zinc-900">
              {blog.author.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-zinc-200">
                {blog.author.name}
              </span>
              <span className="text-[10px] text-zinc-500">
                {formatDate(blog.createdAt)}
              </span>
            </div>
          </div>

          <div className="text-xs text-zinc-500 font-medium px-2 py-1 rounded-full bg-zinc-800/50">
            {/* Reading time estimate */}
            {Math.ceil(blog.content.length / 500)} min read
          </div>
        </div>
      </div>
    </div>
  );
}
