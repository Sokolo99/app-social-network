type Props = {
  children: string;
  size?: string;
};

function Typography({ children, size = "text-xl" }: Props) {
  return <p className={`${size}`}>{children}</p>;
}

export default Typography;
