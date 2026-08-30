import { useEffect, useState } from "react";

type Profile = {
  photo: string;
  intro: string;
  description: string;
};

const STORAGE_KEY = "relay.profile";

const DEFAULT_PROFILE: Profile = {
  photo: "",
  intro: "",
  description: "",
};

function loadProfile(): Profile {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

function persistProfile(profile: Profile) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    /* storage may be unavailable (private mode, quota) - ignore */
  }
}

export function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(loadProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(false);
  }, [profile]);

  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }

  function onPhotoFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("photo", String(reader.result));
    reader.readAsDataURL(file);
  }

  function onSave() {
    persistProfile(profile);
    setSaved(true);
  }

  return (
    <div className="profile-card">
      <h1 className="profile-title">Your profile</h1>

      <div className="profile-avatar-row">
        <img
          className="profile-avatar"
          src={profile.photo || "/logo.svg"}
          alt="Profile photo"
        />
        <div className="profile-avatar-inputs">
          <label className="profile-label">
            Photo URL
            <input
              className="profile-field"
              type="url"
              placeholder="https://example.com/you.jpg"
              value={profile.photo}
              onChange={(e) => update("photo", e.target.value)}
            />
          </label>
          <label className="profile-label">
            Upload photo
            <input
              className="profile-field"
              type="file"
              accept="image/*"
              onChange={onPhotoFile}
            />
          </label>
        </div>
      </div>

      <label className="profile-label">
        Intro
        <input
          className="profile-field"
          type="text"
          placeholder="One line about yourself"
          value={profile.intro}
          onChange={(e) => update("intro", e.target.value)}
        />
      </label>

      <label className="profile-label">
        Description
        <textarea
          className="profile-field profile-textarea"
          rows={5}
          placeholder="Tell people more about what you do…"
          value={profile.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </label>

      <button className="profile-save" onClick={onSave}>
        {saved ? "Saved" : "Save"}
      </button>
    </div>
  );
}
