import { client, servicesQuery } from "@/lib/sanity";
import { Service } from "@/lib/types";

export async function getServices(): Promise<Service[]> {
  try {
    const services = await client.fetch(servicesQuery);
    return services || [];
  } catch (error) {
    console.error("Error fetching services:", error);
    throw new Error("Error fetching services");
  }
}

export async function getService(slug: string): Promise<Service | null> {
  try {
    const service = await client.fetch(
      `
      *[_type == "service" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        mainImage,
        features,
        duration,
        price,
        icon,
        popular,
        order,
        seo
      }
    `,
      { slug }
    );

    return service || null;
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
}
