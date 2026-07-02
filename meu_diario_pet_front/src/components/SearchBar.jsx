import PrimaryButton from "./PrimaryButton";

function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="search-wrap" role="search">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Busque por nome ou tipo"
        className="input"
      />
      <PrimaryButton variant="ghost" onClick={onClear} title="Limpar busca">
        Limpar
      </PrimaryButton>
    </div>
  );
}

export default SearchBar;
