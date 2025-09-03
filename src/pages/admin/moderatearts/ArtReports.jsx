import { useLocation } from "react-router-dom";
import Layout from "../../../components/layouts/layout";

export default function ArtReport() {
  const { state } = useLocation();
  const art = state?.art;

  return (
    <Layout>
      <div className="text-[var(--color)]">
        <h1 className="mb-10 font-bold italic text-2xl drop-shadow-md ">{art?.image_name}Reports</h1>
        {art?.reports?.length ?(
          art.reports.map((r, i) => (
            <div key={i}>
              {r.user}:{r.reason}
            </div>
          )))
          :
          (
          <p>No Reports</p>
        )}
      </div>
    </Layout>
  );
}
