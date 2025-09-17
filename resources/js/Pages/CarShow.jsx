import React, { useState } from "react"
import { Link, usePage } from "@inertiajs/react"
import Nav from "@/Components/Nav"
import { usePermissions } from "@/Components/PermissionHelper"

function CarShow({ cars: car }) {
  const { auth } = usePage().props
  const permissions = usePermissions(auth)
  const [currentImage, setCurrentImage] = useState(0)

  const images = [
    car.image1_path && `/storage/${car.image1_path}`,
    car.image2_path && `/storage/${car.image2_path}`,
    car.image3_path && `/storage/${car.image3_path}`,
    car.image4_path && `/storage/${car.image4_path}`,
  ].filter(Boolean)

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % images.length)

  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

  const taeg = 0.03
  const n = 60
  const taeg_denominateur = 1 - (1 + taeg / 12) ** -n

  const canEdit =
    auth?.user &&
    (car.user_id === auth.user.id ||
      (auth.user.role && ["admin", "moderateur"].includes(auth.user.role)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation */}
      <div className="shadow-md bg-white">
        <Nav auth={auth} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Retour */}
        <div className="mb-4">
          <Link
            href="/"
            className="text-blue-600 hover:underline text-sm flex items-center"
          >
            ← Retour au catalogue
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left content */}
          <div className="md:col-span-2 space-y-6">
            {/* Carousel */}
            <div className="relative rounded-2xl overflow-hidden shadow">
              <img
                src={images[currentImage]}
                alt={`${car.brand.name} ${car.model}`}
                className="w-full h-96 object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Info principale */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h1 className="text-3xl font-bold text-gray-800">
                {car.brand.name} {car.model}
              </h1>
              <p className="text-2xl text-blue-600 font-semibold mt-2">
                {car.prix.toLocaleString()} €
              </p>

              <div className="flex gap-3 mt-4 flex-wrap">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {car.annee}
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {car.kilometrage.toLocaleString()} km
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {car.fuel.fuel}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    car.etat === "neuf"
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {car.etat}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{car.description}</p>
            </div>

            {/* Caractéristiques */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Caractéristiques</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Carburant</p>
                  <p>{car.fuel.fuel}</p>
                </div>
                {car.fuel.fuel !== "Electrique" && (
                  <div>
                    <p className="text-gray-500">Cylindrée</p>
                    <p>{car.cylindree}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-500">Couleur</p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full border"
                      style={{ backgroundColor: car.couleur }}
                    />
                    {car.couleur}
                  </div>
                </div>
                <div>
                  <p className="text-gray-500">Type</p>
                  <p>{car.type}</p>
                </div>
                <div>
                  <p className="text-gray-500">Jantes</p>
                  <p>{car.jantes}"</p>
                </div>
                <div>
                  <p className="text-gray-500">Sellerie</p>
                  <p>{car.sellerie}</p>
                </div>
              </div>
            </div>

            {/* Équipements */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Équipements</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                {car.abs !== 0 && (
                  <span className="px-3 py-1 bg-gray-100 rounded-full">
                    ✓ ABS
                  </span>
                )}
                <span className="px-3 py-1 bg-gray-100 rounded-full">
                  ✓ {car.fuel.fuel}
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full">
                  ✓ Jantes {car.jantes}"
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full">
                  ✓ Sellerie {car.sellerie}
                </span>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Vendeur */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold mb-3">Vendeur</h3>
              <p className="font-medium">
                {car.user.first_name} {car.user.name}
              </p>
              <Link
                href={route("mail")}
                className="block w-full mt-4 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Contacter le vendeur
              </Link>
              <p className="text-xs text-gray-500 mt-2">
                Connectez-vous pour contacter le vendeur
              </p>
            </div>

            {/* Simulation financement */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold mb-3">
                Simulation de financement
              </h3>
              <div className="flex justify-between text-sm">
                <span>Prix du véhicule</span>
                <span className="font-semibold">
                  {car.prix.toLocaleString()} €
                </span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>Mensualité estimée</span>
                <span className="text-blue-600 font-bold">
                  {(
                    (car.prix * (taeg / 12)) /
                    taeg_denominateur
                  ).toFixed(2)}{" "}
                  €
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Simulation indicative sur 60 mois
              </p>
            </div>

            {/* Actions admin */}
            {permissions.canEditCar(car) && (
              <div className="space-y-2">
                <Link
                  href={`/edit/${car.id}`}
                  className="block w-full text-center py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Modifier
                </Link>
                <Link
                  href={`/delete/${car.id}`}
                  method="delete"
                  as="button"
                  className="block w-full text-center py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                  onClick={(e) => {
                    if (
                      !confirm(
                        "Êtes-vous sûr de vouloir supprimer cette voiture ?"
                      )
                    ) {
                      e.preventDefault()
                    }
                  }}
                >
                  Supprimer
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarShow
