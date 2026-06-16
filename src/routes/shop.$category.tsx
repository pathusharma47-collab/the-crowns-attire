import { createFileRoute, notFound } from "@tanstack/react-router";
import { getProductsByCategory, categories } from "@/lib/products";
import { PLP } from "./shop";

export const Route = createFileRoute("/shop/$category")({
  head: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.category);
    return {
      meta: [
        { title: `${cat?.label ?? "Shop"} — The Crown's Attire` },
        { name: "description", content: `Shop premium ${cat?.label ?? "menswear"} from The Crown's Attire.` },
      ],
    };
  },
  loader: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.category);
    if (!cat) throw notFound();
    return { cat };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const items = getProductsByCategory(category);
  const cat = categories.find((c) => c.slug === category)!;
  return <PLP title={cat.label} subtitle="Category" items={items} />;
}
