import React, { useEffect} from "react";
import Select from "react-select";

import { useAddressStore } from "../../store/addressStore"

const AddressDetails: React.FC<{ register: any }> = ({ register }) => {
  const {
    states,
    districts,
    taluks,
    fetchStates,
    fetchDistricts,
    fetchTaluks,
    selectedState,
    selectedDistrict,
    selectedTaluk,
    setSelectedState,
    setSelectedDistrict,
    setSelectedTaluk,
  } = useAddressStore();

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetchDistricts(selectedState.id);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchTaluks(selectedDistrict.id);
    }
  }, [selectedDistrict]);

  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold">Current Address</label>
      <textarea {...register("currentAddress")} className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"></textarea>

      <label className="block text-lg font-semibold">Country</label>
      <select {...register("country")} className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400">
        <option value="India">India</option>
      </select>

      <label className="block text-lg font-semibold">State</label>
      <Select
        options={states.map((state) => ({ value: state.id, label: state.name }))}
        value={selectedState ? { value: selectedState.id, label: selectedState.name } : null}
        onChange={(selected) => setSelectedState(selected ? { id: selected.value, name: selected.label } : null)}
        placeholder="Select State"
        isClearable
      />

      <label className="block text-lg font-semibold">District</label>
      <Select
        options={districts.map((district) => ({ value: district.id, label: district.name }))}
        value={selectedDistrict ? { value: selectedDistrict.id, label: selectedDistrict.name } : null}
        onChange={(selected) => setSelectedDistrict(selected ? { id: selected.value, name: selected.label } : null)}
        placeholder="Select District"
        isDisabled={!selectedState}
        isClearable
      />

      <label className="block text-lg font-semibold">Taluk</label>
      <Select
        options={taluks.map((taluk) => ({ value: taluk.id, label: taluk.name }))}
        value={selectedTaluk ? { value: selectedTaluk.id, label: selectedTaluk.name } : null}
        onChange={(selected) => setSelectedTaluk(selected ? { id: selected.value, name: selected.label } : null)}
        placeholder="Select Taluk"
        isDisabled={!selectedDistrict}
        isClearable
      />
    </div>
  );
};

export default AddressDetails;
