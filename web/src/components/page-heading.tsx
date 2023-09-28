interface PageHeadingProps {
  title: string
};

export default function PageHeading({title}: PageHeadingProps) {
  return (<div className="border-b-2 border-gray-300">
    <h1 className="text-3xl sm:text-4xl py-3 text-gray-700">{title}</h1>
  </div>)
}