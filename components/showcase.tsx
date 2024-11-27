import SectionInfo from "./section-info"
import InfoIcon from "./info-icon"
import Note from "./note"

export default function Example() {
  return (
    <div className="p-4 bg-black min-h-screen space-y-4">
      <Note>This is a default warning note.</Note>
      <Note variant="warning">This is a warning note.</Note>
      <Note variant="default">This is a default note.</Note>
      <Note variant="error">This is an error note.</Note>
      <Note variant="ghost">This is a ghost note.</Note>
      <Note variant="success">This is a success note.</Note>
      <Note variant="violet">This is a violet note.</Note>
      <Note variant="cyan">This is a cyan note.</Note>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">Info Icons with Tooltips</h3>
        <div className="flex space-x-4">
          <InfoIcon tooltip="Default tooltip" variant="default" side="top" />
          <InfoIcon tooltip="Error tooltip" variant="error" side="right" />
          <InfoIcon tooltip="Ghost tooltip" variant="ghost" side="bottom" />
          <InfoIcon tooltip="Success tooltip" variant="success" side="left" />
          <InfoIcon tooltip="Violet tooltip" variant="violet" side="top" />
          <InfoIcon tooltip="Cyan tooltip" variant="cyan" side="right" />
          <InfoIcon tooltip="Warning tooltip" variant="warning" side="bottom" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Section Info Cards</h3>
        <SectionInfo 
          title="Default Section" 
          tooltip="This is the default variant."
          tooltipSide="top"
        >
          Default section information.
        </SectionInfo>
        <SectionInfo 
          title="Error Section" 
          tooltip="This is the error variant."
          variant="error"
          tooltipSide="right"
        >
          Error section information.
        </SectionInfo>
        <SectionInfo 
          title="Ghost Section" 
          tooltip="This is the ghost variant."
          variant="ghost"
          tooltipSide="bottom"
        >
          Ghost section information.
        </SectionInfo>
        <SectionInfo 
          title="Success Section" 
          tooltip="This is the success variant."
          variant="success"
          tooltipSide="left"
        >
          Success section information.
        </SectionInfo>
        <SectionInfo 
          title="Violet Section" 
          tooltip="This is the violet variant."
          variant="violet"
          tooltipSide="top"
        >
          Violet section information.
        </SectionInfo>
        <SectionInfo 
          title="Cyan Section" 
          tooltip="This is the cyan variant."
          variant="cyan"
          tooltipSide="right"
        >
          Cyan section information.
        </SectionInfo>
        <SectionInfo 
          title="Warning Section" 
          tooltip="This is the warning variant."
          variant="warning"
          tooltipSide="bottom"
        >
          Warning section information.
        </SectionInfo>
     </div>
    </div>
  )
}

