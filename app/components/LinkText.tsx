import Link from "next/link";

type LinkText = {
  preText?: string;
  text: string;
  link: string;
}

export const LinkText = ({text, preText, link}: LinkText) => {
  return (
    <p className="mt-5 text-center text-sm text-gray-500">
    {preText}
    <Link href={link} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
        {text}
    </Link>
  </p>
  );
}