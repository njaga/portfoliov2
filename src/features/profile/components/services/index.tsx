import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { SERVICES } from "../../data/services";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ServiceItemSimple } from "./service-item-simple";

export function Services() {
  return (
    <Panel id="services">
      <PanelHeader>
        <PanelTitle>
          Services
          <sup className="ml-1 font-mono text-sm text-muted-foreground select-none">
            ({SERVICES.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <div className="pr-2 pl-4 py-4">
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SERVICES.slice(0, 4).map((service) => (
              <ServiceItemSimple key={service.id} service={service} />
            ))}
          </div>
          
          {SERVICES.length > 4 && (
            <div className="flex h-12 items-center justify-center pb-px">
              <Button asChild className="group/collapsible-trigger flex" variant="secondary">
                <Link href="/services">
                  <span>View all services</span>
                  <ChevronDownIcon className="rotate-[-90deg]" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Panel>
  );
} 