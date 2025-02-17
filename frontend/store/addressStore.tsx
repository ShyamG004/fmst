import { create } from "zustand";

interface AddressState {
  states: { id: string; name: string }[];
  districts: { id: string; name: string }[];
  taluks: { id: string; name: string }[];
  fetchStates: () => Promise<void>;
  fetchDistricts: (stateId: string) => Promise<void>;
  fetchTaluks: (districtId: string) => Promise<void>;

  selectedState: { id: string; name: string } | null;
  selectedDistrict: { id: string; name: string } | null;
  selectedTaluk: { id: string; name: string } | null;
  setSelectedState: (state: { id: string; name: string } | null) => void;
  setSelectedDistrict: (district: { id: string; name: string } | null) => void;
  setSelectedTaluk: (taluk: { id: string; name: string } | null) => void;

  permanentState: { id: string; name: string } | null;
  permanentDistrict: { id: string; name: string } | null;
  permanentTaluk: { id: string; name: string } | null;
  setPermanentState: (state: { id: string; name: string } | null) => void;
  setPermanentDistrict: (district: { id: string; name: string } | null) => void;
  setPermanentTaluk: (taluk: { id: string; name: string } | null) => void;
}

export const useAddressStore = create<AddressState>((set) => ({
  states: [],
  districts: [],
  taluks: [],
  selectedState: JSON.parse(localStorage.getItem('selectedState') || 'null'),
  selectedDistrict: JSON.parse(localStorage.getItem('selectedDistrict') || 'null'),
  selectedTaluk: JSON.parse(localStorage.getItem('selectedTaluk') || 'null'),
  
  permanentState: JSON.parse(localStorage.getItem('permanentState') || 'null'),
  permanentDistrict: JSON.parse(localStorage.getItem('permanentDistrict') || 'null'),
  permanentTaluk: JSON.parse(localStorage.getItem('permanentTaluk') || 'null'),

  fetchStates: async () => {
    try {
      const response = await fetch("http://localhost:5000/api/states");
      if (!response.ok) throw new Error("Failed to fetch states");
      const data = await response.json();
      set({ states: data.map((s: any) => ({ id: s.id, name: s.name })) });
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  },

  fetchDistricts: async (stateId) => {
    if (!stateId) return;
    try {
      const response = await fetch(`http://localhost:5000/api/districts/${stateId}`);
      if (!response.ok) throw new Error("Failed to fetch districts");
      const data = await response.json();
      set({ districts: data.map((d: any) => ({ id: d.id, name: d.name })), taluks: [] });
    } catch (error) {
      console.error(`Error fetching districts for state ${stateId}:`, error);
    }
  },
  fetchTaluks: async (districtId) => {
    if (!districtId) return;
    try {
      const response = await fetch(`http://localhost:5000/api/taluks/${districtId}`);
      if (!response.ok) throw new Error("Failed to fetch taluks");
      const data = await response.json();
      set({ taluks: data.map((t: any) => ({ id: t.id, name: t.name })) });
    } catch (error) {
      console.error(`Error fetching taluks for district ${districtId}:`, error);
    }
  },

  setSelectedState: (state) => {
    set({ selectedState: state });
    localStorage.setItem('selectedState', JSON.stringify(state));
  },
  setSelectedDistrict: (district) => {
    set({ selectedDistrict: district });
    localStorage.setItem('selectedDistrict', JSON.stringify(district));
  },
  setSelectedTaluk: (taluk) => {
    set({ selectedTaluk: taluk });
    localStorage.setItem('selectedTaluk', JSON.stringify(taluk));
  },

  setPermanentState: (state) => {
    set({ permanentState: state });
    localStorage.setItem('permanentState', JSON.stringify(state));
  },
  setPermanentDistrict: (district) => {
    set({ permanentDistrict: district });
    localStorage.setItem('permanentDistrict', JSON.stringify(district));
  },
  setPermanentTaluk: (taluk) => {
    set({ permanentTaluk: taluk });
    localStorage.setItem('permanentTaluk', JSON.stringify(taluk));
  },
}));
