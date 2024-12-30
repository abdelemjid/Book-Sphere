type Props = {
  adminLogout: () => Promise<void>;
};

const Logout = ({ adminLogout }: Props) => {
  return (
    <button
      onClick={async () => {
        await adminLogout();
      }}
      className="px-2 py-1 duration-200 hover:bg-primary-300/30 dark:hover:bg-third-100 rounded-md"
    >
      Logout
    </button>
  );
};

export default Logout;
