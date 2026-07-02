import mockData from "../data/mockData.json";

const STORAGE_KEY = "meu_diario_pet_mvp_state";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getDefaultState() {
  return {
    pets: clone(mockData.pets),
    diarios: clone(mockData.diarios),
    dicas: clone(mockData.dicas),
  };
}

function readState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const initial = getDefaultState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  try {
    return JSON.parse(raw);
  } catch {
    const fallback = getDefaultState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
    return fallback;
  }
}

function writeState(nextState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

function withDelay(callback, delay = 450) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(callback());
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
}

export function getPets(search = "") {
  return withDelay(() => {
    const state = readState();
    const normalized = search.trim().toLowerCase();

    if (!normalized) {
      return state.pets;
    }

    return state.pets.filter((pet) => {
      return (
        pet.nome.toLowerCase().includes(normalized) ||
        pet.tipo.toLowerCase().includes(normalized)
      );
    });
  });
}

export function createPet(payload) {
  return withDelay(() => {
    const state = readState();
    const newPet = {
      id: Date.now(),
      nome: payload.nome,
      idade: Number(payload.idade),
      tipo: payload.tipo,
      foto: payload.foto,
    };

    state.pets.unshift(newPet);
    state.diarios[newPet.id] = [];
    writeState(state);
    return newPet;
  });
}

export function getPetById(petId) {
  return withDelay(() => {
    const state = readState();
    const targetId = Number(petId);
    const pet = state.pets.find((item) => item.id === targetId);

    if (!pet) {
      throw new Error("Pet nao encontrado");
    }

    return pet;
  });
}

export function getDiaryEntriesByPetId(petId) {
  return withDelay(() => {
    const state = readState();
    const entries = state.diarios[String(petId)] || [];
    return entries;
  });
}

export function addDiaryEntry(petId, payload) {
  return withDelay(() => {
    const state = readState();
    const key = String(petId);
    const current = state.diarios[key] || [];
    const newEntry = {
      id: Date.now(),
      data: payload.data,
      humor: payload.humor,
      alimentacao: payload.alimentacao,
      observacoes: payload.observacoes,
    };

    state.diarios[key] = [newEntry, ...current];
    writeState(state);
    return newEntry;
  });
}

export function deleteDiaryEntry(petId, entryId) {
  return withDelay(() => {
    const state = readState();
    const key = String(petId);
    state.diarios[key] = (state.diarios[key] || []).filter(
      (entry) => entry.id !== entryId
    );
    writeState(state);
    return { success: true };
  });
}

export function getCareTips() {
  return withDelay(() => {
    const state = readState();
    return state.dicas;
  }, 600);
}
