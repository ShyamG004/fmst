import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useAddressStore } from "../../store/addressStore";

const PermanentAddress: React.FC<{ register: any; watch: any; setValue: any }> = ({ register, watch, setValue }) => {
  const [sameAsCurrent, setSameAsCurrent] = useState(false);

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
    permanentState,
    permanentDistrict,
    permanentTaluk,
    setPermanentState,
    setPermanentDistrict,
    setPermanentTaluk,
  } = useAddressStore();

  const currentAddress = watch("currentAddress");

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (permanentState) {
      fetchDistricts(permanentState.id);
    }
  }, [permanentState]);

  useEffect(() => {
    if (permanentDistrict) {
      fetchTaluks(permanentDistrict.id);
    }
  }, [permanentDistrict]);

  useEffect(() => {
    if (sameAsCurrent) {
      setValue("permanentAddress", currentAddress);
      setPermanentState(selectedState);
      setPermanentDistrict(selectedDistrict);
      setPermanentTaluk(selectedTaluk);
    } else {
      setValue("permanentAddress", "");
      setPermanentState(null);
      setPermanentDistrict(null);
      setPermanentTaluk(null);
    }
  }, [sameAsCurrent, selectedState, selectedDistrict, selectedTaluk, currentAddress, setValue]);
  useEffect(() => {
    if (sameAsCurrent) {
      setValue("permanentAddress", currentAddress);
      localStorage.setItem('selectedState', JSON.stringify(selectedState));
      localStorage.setItem('selectedDistrict', JSON.stringify(selectedDistrict));
      localStorage.setItem('selectedTaluk', JSON.stringify(selectedTaluk));
    } else {
      setValue("permanentAddress", "");
    }
  }, [sameAsCurrent, currentAddress, setValue, selectedState, selectedDistrict, selectedTaluk]);
  
  

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="sameAsCurrent"
          checked={sameAsCurrent}
          onChange={() => setSameAsCurrent(!sameAsCurrent)}
          className="w-5 h-5"
        />
        <label htmlFor="sameAsCurrent" className="text-lg font-semibold">
          Same as Current Address
        </label>
      </div>

      <label className="block text-lg font-semibold">Permanent Address</label>
      <textarea
        {...register("permanentAddress")}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
        disabled={sameAsCurrent}
      ></textarea>

      <label className="block text-lg font-semibold">Country</label>
      <select
        {...register("permanentCountry")}
        className="border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
        disabled={sameAsCurrent}
      >
        <option value="India">India</option>
      </select>

      <label className="block text-lg font-semibold">State</label>
      <Select
        options={states.map((state) => ({ value: state.id, label: state.name }))}
        value={permanentState ? { value: permanentState.id, label: permanentState.name } : null}
        onChange={(selected) => setPermanentState(selected ? { id: selected.value, name: selected.label } : null)}
        placeholder="Select State"
        isClearable
        isDisabled={sameAsCurrent}
      />

      <label className="block text-lg font-semibold">District</label>
      <Select
        options={districts.map((district) => ({ value: district.id, label: district.name }))}
        value={permanentDistrict ? { value: permanentDistrict.id, label: permanentDistrict.name } : null}
        onChange={(selected) => setPermanentDistrict(selected ? { id: selected.value, name: selected.label } : null)}
        placeholder="Select District"
        isDisabled={!permanentState || sameAsCurrent}
        isClearable
      />

      <label className="block text-lg font-semibold">Taluk</label>
      <Select
        options={taluks.map((taluk) => ({ value: taluk.id, label: taluk.name }))}
        value={permanentTaluk ? { value: permanentTaluk.id, label: permanentTaluk.name } : null}
        onChange={(selected) => setPermanentTaluk(selected ? { id: selected.value, name: selected.label } : null)}
        placeholder="Select Taluk"
        isDisabled={!permanentDistrict || sameAsCurrent}
        isClearable
      />
    </div>
  );
};

export default PermanentAddress;
