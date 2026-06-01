import { useState } from "react";

const beforeAfter = [
  {
    id: 1,
    label: "Natural to Full Glam",
    before: "https://readdy.ai/api/search-image?query=beautiful%20Black%20woman%20with%20short%20natural%20hair%2C%20natural%20hair%20texture%2C%20simple%20background%2C%20warm%20lighting%2C%20before%20hair%20transformation%2C%20natural%20look%2C%20minimal%20styling%2C%20real%20and%20authentic%20look%2C%20warm%20skin%20tone%2C%20portrait%20style%20photo&width=300&height=300&seq=ba1&orientation=squarish",
    after: "https://readdy.ai/api/search-image?query=beautiful%20Black%20woman%20with%20long%20silky%20straight%20lace%20front%20wig%2C%20full%20glam%20transformation%2C%20voluminous%20and%20luxurious%20hair%2C%20confident%20and%20glamorous%2C%20warm%20lighting%2C%20after%20hair%20transformation%2C%20elegant%20look%2C%20rich%20skin%20tone%2C%20portrait%20style%20photo&width=300&height=300&seq=ba2&orientation=squarish",
    product: "Silky Straight Lace Front — 22\"",
  },
  {
    id: 2,
    label: "Added Volume & Length",
    before: "https://readdy.ai/api/search-image?query=beautiful%20Black%20woman%20with%20natural%20shoulder%20length%20hair%2C%20plain%20simple%20background%2C%20natural%20and%20relaxed%20look%2C%20before%20hair%20extension%20installation%2C%20warm%20lighting%2C%20minimal%20styling%2C%20authentic%20look%2C%20portrait%20style%20photo&width=300&height=300&seq=ba3&orientation=squarish",
    after: "https://readdy.ai/api/search-image?query=beautiful%20Black%20woman%20with%20long%20voluminous%20body%20wave%20hair%20extensions%2C%20added%20length%20and%20volume%2C%20full%20and%20glamorous%2C%20warm%20lighting%2C%20after%20hair%20transformation%2C%20confident%20and%20elegant%2C%20rich%20skin%20tone%2C%20portrait%20style%20photo&width=300&height=300&seq=ba4&orientation=squarish",
    product: "3-Bundle Body Wave + Closure",
  },
  {
    id: 3,
    label: "Curly Transformation",
    before: "https://readdy.ai/api/search-image?query=beautiful%20Black%20woman%20with%20natural%20short%20hair%2C%20simple%20background%2C%20natural%20and%20relaxed%20look%2C%20before%20hair%20transformation%2C%20warm%20lighting%2C%20minimal%20makeup%2C%20authentic%20look%2C%20portrait%20style%20photo%2C%20warm%20tones&width=300&height=300&seq=ba5&orientation=squarish",
    after: "https://readdy.ai/api/search-image?query=beautiful%20Black%20woman%20with%20deep%20curly%20lace%20front%20wig%2C%20defined%20tight%20curls%2C%20voluminous%20and%20natural%20looking%2C%20confident%20and%20glamorous%2C%20warm%20golden%20lighting%2C%20after%20hair%20transformation%2C%20rich%20skin%20tone%2C%20portrait%20style%20photo&width=300&height=300&seq=ba6&orientation=squarish",
    product: "Deep Curly HD Lace Wig — 18\"",
  },
];

export default function BeforeAfterSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-16 bg-[#FDF9F7]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-rose-700 mb-3 block">
            Transformations
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-stone-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Before & After
          </h2>
          <p className="text-stone-500 mt-3 max-w-md mx-auto">
            See the incredible transformations our customers have achieved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {beforeAfter.map((item) => (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden">
                <div className="relative aspect-square">
                  <img
                    src={item.before}
                    alt="Before"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-md">
                    BEFORE
                  </div>
                </div>
                <div className="relative aspect-square">
                  <img
                    src={item.after}
                    alt="After"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                    AFTER
                  </div>
                </div>
              </div>
              <div
                className={`mt-3 text-center transition-opacity duration-300 ${
                  hovered === item.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-sm font-semibold text-stone-900">{item.label}</p>
                <p className="text-xs text-rose-700 font-medium">{item.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}