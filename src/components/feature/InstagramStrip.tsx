export default function InstagramStrip() {
  const posts = [
    {
      id: 1,
      image: 'https://readdy.ai/api/search-image?query=beautiful%20Black%20woman%20wearing%20a%20sleek%20bone%20straight%20lace%20front%20wig%2C%20glamorous%20selfie%20style%20photo%2C%20warm%20golden%20lighting%2C%20confident%20and%20stylish%2C%20rich%20skin%20tone%2C%20natural%20looking%20hairline%2C%20fashion%20editorial%20aesthetic&width=400&height=400&seq=ig001&orientation=squarish',
      likes: '1.2k',
      caption: 'Bone straight serving looks all day 🖤',
    },
    {
      id: 2,
      image: 'https://readdy.ai/api/search-image?query=gorgeous%20woman%20with%20deep%20burgundy%20wine%20red%20curly%20wig%2C%20bold%20and%20glamorous%2C%20warm%20studio%20lighting%2C%20confident%20smile%2C%20fashion%20portrait%2C%20rich%20and%20vibrant%20hair%20colour%2C%20luxurious%20look&width=400&height=400&seq=ig002&orientation=squarish',
      likes: '987',
      caption: 'Burgundy curls are everything 🍷',
    },
    {
      id: 3,
      image: 'https://readdy.ai/api/search-image?query=beautiful%20Black%20woman%20with%20chic%20bob%20wig%20with%20fringe%20bangs%2C%20stylish%20and%20modern%2C%20warm%20lighting%2C%20confident%20expression%2C%20fashion%20portrait%2C%20sleek%20and%20polished%20look%2C%20elegant%20aesthetic&width=400&height=400&seq=ig003&orientation=squarish',
      likes: '2.1k',
      caption: 'Fringe bob era — no going back ✂️',
    },
    {
      id: 4,
      image: 'https://readdy.ai/api/search-image?query=stunning%20woman%20with%20long%20loose%20wave%20hair%20extensions%2C%20beachy%20and%20effortless%20waves%2C%20warm%20golden%20lighting%2C%20glamorous%20and%20confident%2C%20fashion%20editorial%20portrait%2C%20voluminous%20and%20glossy%20hair&width=400&height=400&seq=ig004&orientation=squarish',
      likes: '1.8k',
      caption: 'Loose waves for the weekend 🌊',
    },
    {
      id: 5,
      image: 'https://readdy.ai/api/search-image?query=beautiful%20woman%20with%20kinky%20curly%20afro%20wig%2C%20bold%20and%20natural%20look%2C%20warm%20studio%20lighting%2C%20confident%20and%20radiant%2C%20fashion%20portrait%2C%20voluminous%20natural%20hair%20texture%2C%20empowering%20and%20beautiful&width=400&height=400&seq=ig005&orientation=squarish',
      likes: '3.4k',
      caption: 'Kinky curls, big energy 💫',
    },
    {
      id: 6,
      image: 'https://readdy.ai/api/search-image?query=woman%20with%20long%20silky%20straight%20lace%20front%20wig%2C%20ultra%20sleek%20and%20glossy%2C%20elegant%20fashion%20portrait%2C%20warm%20lighting%2C%20confident%20and%20glamorous%2C%20natural%20looking%20hairline%2C%20premium%20hair%20quality&width=400&height=400&seq=ig006&orientation=squarish',
      likes: '1.5k',
      caption: 'Silky straight and unstoppable 🔥',
    },
    {
      id: 7,
      image: 'https://readdy.ai/api/search-image?query=beautiful%20Black%20woman%20with%20body%20wave%20wig%2C%20soft%20natural%20waves%2C%20warm%20golden%20studio%20lighting%2C%20glamorous%20and%20confident%2C%20fashion%20editorial%20portrait%2C%20voluminous%20and%20healthy%20looking%20hair&width=400&height=400&seq=ig007&orientation=squarish',
      likes: '2.7k',
      caption: 'Body wave giving all the vibes 💕',
    },
    {
      id: 8,
      image: 'https://readdy.ai/api/search-image?query=gorgeous%20woman%20with%20fringe%20bone%20straight%20wig%2C%20sleek%20straight%20hair%20with%20blunt%20bangs%2C%20bold%20and%20stylish%2C%20warm%20lighting%2C%20confident%20fashion%20portrait%2C%20modern%20and%20chic%20aesthetic&width=400&height=400&seq=ig008&orientation=squarish',
      likes: '1.9k',
      caption: 'Fringe straight — the move 👑',
    },
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-2 block">Follow Along</span>
            <h2
              className="text-3xl md:text-4xl font-bold text-stone-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              @goldcoasthair
            </h2>
          </div>
          <a
            href="https://instagram.com/goldcoasthair"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-2 border border-stone-200 hover:border-rose-400 text-stone-700 hover:text-rose-700 text-sm font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            <i className="ri-instagram-line text-base"></i>
            Follow on Instagram
          </a>
        </div>
      </div>

      {/* Scrolling grid */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-1 px-0">
        {posts.map((post) => (
          <a
            key={post.id}
            href="https://instagram.com/goldcoasthair"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="relative aspect-square overflow-hidden group cursor-pointer bg-stone-100"
          >
            <img
              src={post.image}
              alt={post.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-3 text-center">
              <div className="flex items-center gap-1.5 mb-2">
                <i className="ri-heart-fill text-rose-400 text-sm"></i>
                <span className="text-sm font-semibold">{post.likes}</span>
              </div>
              <p className="text-xs leading-snug line-clamp-2">{post.caption}</p>
            </div>
          </a>
        ))}
      </div>

      {/* CTA strip */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-stone-500 text-sm">
          Tag us <strong className="text-stone-800">@goldcoasthair</strong> in your photos to be featured
        </p>
        <div className="flex items-center gap-3">
          {[
            { icon: 'ri-instagram-line', label: 'Instagram', href: 'https://instagram.com/goldcoasthair' },
            { icon: 'ri-tiktok-line', label: 'TikTok', href: 'https://tiktok.com/@goldcoasthair' },
            { icon: 'ri-facebook-line', label: 'Facebook', href: 'https://facebook.com/goldcoasthair' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="nofollow noopener noreferrer"
              aria-label={s.label}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-100 hover:bg-rose-100 text-stone-600 hover:text-rose-700 transition-colors cursor-pointer"
            >
              <i className={`${s.icon} text-base`}></i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}