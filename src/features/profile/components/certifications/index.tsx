import dayjs from "dayjs";

import { CollapsibleList } from "@/components/collapsible-list";

import { CERTIFICATIONS } from "../../data/certifications";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { CertificationItem } from "./certification-item";

export function Certifications() {
  // Trier les certifications par date décroissante (plus récent au plus ancien)
  const sortedCertifications = [...CERTIFICATIONS].sort((a, b) => 
    dayjs(b.issueDate).valueOf() - dayjs(a.issueDate).valueOf()
  );

  return (
    <Panel id="certs">
      <PanelHeader>
        <PanelTitle>
          Certifications
          <sup className="ml-1 font-mono text-sm font-medium text-muted-foreground select-none">
            ({CERTIFICATIONS.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={sortedCertifications}
        max={5}
        renderItem={(item) => <CertificationItem certification={item} />}
      />
    </Panel>
  );
}
