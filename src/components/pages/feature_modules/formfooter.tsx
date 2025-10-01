import { Link } from "react-router";

function FormFooter() {
  return (
    <div className="w-full text-center p-4 mt-2">
      <p className="text-sm text-gray-600">
        By clicking continue, you agree to our{" "}
        <Link
          to="/terms"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          to="/privacy"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
export default FormFooter;
