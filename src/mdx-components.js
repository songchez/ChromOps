import Image from "next/image";

export function useMDXComponents(components) {
  return {
    img: (props) => (
      <div className="flex justify-center my-6">
        <Image
          className="rounded-lg w-full h-auto"
          {...props}
          alt={props.alt || "Blog image"}
        />
      </div>
    ),
    ...components,
  };
}
