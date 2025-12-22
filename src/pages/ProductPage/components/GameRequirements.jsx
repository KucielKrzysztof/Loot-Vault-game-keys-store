const RequirementRow = ({ label, value }) => (
  <div className="flex flex-row gap-3 border-b border-white/5 py-2">
    <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
      {label}:
    </span>
    <span className="text-sm text-gray-200">{value}</span>
  </div>
);

function GameRequirements({ requirements }) {
  return (
    <div className="mt-10 rounded-[40px] border border-white/5 bg-black/20 p-8 lg:p-12">
      <h2 className="mb-10 text-left text-3xl font-black uppercase">
        System Requirements
      </h2>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <div>
          <h3 className="text-primary mb-6 text-left text-sm font-black tracking-widest uppercase underline underline-offset-8">
            Minimum
          </h3>
          <div className="space-y-1">
            <RequirementRow label="OS" value={requirements.minimum.os} />
            <RequirementRow
              label="Processor"
              value={requirements.minimum.processor}
            />
            <RequirementRow
              label="Memory"
              value={requirements.minimum.memory}
            />
            <RequirementRow label="Graphics" value={requirements.minimum.gpu} />
          </div>
        </div>
        <div>
          <h3 className="text-secondary mb-6 text-left text-sm font-black tracking-widest uppercase underline underline-offset-8">
            Recommended
          </h3>
          <div className="space-y-1">
            <RequirementRow label="OS" value={requirements.recommended.os} />
            <RequirementRow
              label="Processor"
              value={requirements.recommended.processor}
            />
            <RequirementRow
              label="Memory"
              value={requirements.recommended.memory}
            />
            <RequirementRow
              label="Graphics"
              value={requirements.recommended.gpu}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameRequirements;
