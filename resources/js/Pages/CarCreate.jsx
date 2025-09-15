import React, { useState } from 'react'
import { useForm } from '@inertiajs/react'
import Nav from '@/Components/Nav'
import '../../css/carCreate.css'

export default function CarCreate({ brands, fuels }) {
    const { data, setData, post, processing, errors } = useForm({
        brand_id: '',      
        fuel_id: '',       
        model: '',        
        etat: 'occasion',
        annee: new Date().getFullYear(),
        kilometrage: 0,
        abs: false,
        
        image1_path: '',
        image1_file: null,
        image2_path: '',
        image2_file: null,
        image3_path: '',
        image3_file: null,
        image4_path: '',
        image4_file: null,
        
        jantes: '16',
        sellerie: 'Tissus',
        couleur: '#000000',
        type: 'BERLINE',
        cylindree: '1.5l',
        prix: 0,
        description: ''
    })

    const [imageTypes, setImageTypes] = useState({
        image1: 'file',
        image2: 'file',
        image3: 'file',
        image4: 'file'
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/store')
    }

    const handleFuelChange = (fuelId) => {
        const selectedFuel = fuels.find(fuel => fuel.id == fuelId)
        setData('fuel_id', fuelId)
        
        if (selectedFuel && selectedFuel.fuel === 'Electrique') {
            setData('cylindree', 'NONE')
        }
    }

    const handleImageTypeChange = (imageNum, type) => {
        setImageTypes(prev => ({
            ...prev,
            [`image${imageNum}`]: type
        }))
        
        setData(`image${imageNum}_path`, '')
        setData(`image${imageNum}_file`, null)
    }

    const handleFileChange = (imageNum, file) => {
        setData(`image${imageNum}_file`, file)
    }

    return (
        <div className="car-create">
            <div className='navigation'>
                 <Nav/>
            </div>
            
            <div className="create-container">
                <h1>Vendre ma voiture</h1>
                
                <form onSubmit={handleSubmit} className="car-form" encType="multipart/form-data">
                    <div className="form-section">
                        <h2>Informations générales</h2>
                        
                        <div className="form-group">
                            <label>Marque * (choisir dans la liste)</label>
                            <select 
                                value={data.brand_id} 
                                onChange={e => setData('brand_id', e.target.value)}
                                required
                            >
                                <option value="">-- Sélectionner une marque --</option>
                                {brands.map(brand => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                            {errors.brand_id && <span className="error">{errors.brand_id}</span>}
                        </div>

                        <div className="form-group">
                            <label>Modèle</label>
                            <input 
                                type="text" 
                                value={data.model}
                                onChange={e => setData('model', e.target.value)}
                                placeholder="Ex: Clio, Golf, 308, C3..."
                                required
                            />
                            {errors.model && <span className="error">{errors.model}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>État *</label>
                                <select 
                                    value={data.etat} 
                                    onChange={e => setData('etat', e.target.value)}
                                >
                                    <option value="neuf">Neuf</option>
                                    <option value="occasion">Occasion</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Année *</label>
                                <input 
                                    type="number" 
                                    min="1975" 
                                    max={new Date().getFullYear()}
                                    value={data.annee}
                                    onChange={e => setData('annee', e.target.value)}
                                    required
                                />
                                {errors.annee && <span className="error">{errors.annee}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Kilométrage *</label>
                                <input 
                                    type="number" 
                                    min="0"
                                    value={data.kilometrage}
                                    onChange={e => setData('kilometrage', e.target.value)}
                                    placeholder="Ex: 50000"
                                    required
                                />
                                {errors.kilometrage && <span className="error">{errors.kilometrage}</span>}
                            </div>

                            <div className="form-group">
                                <label>Prix de vente (€) *</label>
                                <input 
                                    type="number" 
                                    min="0"
                                    step="0.01"
                                    value={data.prix}
                                    onChange={e => setData('prix', e.target.value)}
                                    placeholder="Ex: 15000"
                                    required
                                />
                                {errors.prix && <span className="error">{errors.prix}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Caractéristiques techniques</h2>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label>Carburant * (choisir dans la liste)</label>
                                <select 
                                    value={data.fuel_id} 
                                    onChange={e => handleFuelChange(e.target.value)}
                                    required
                                >
                                    <option value="">-- Sélectionner un carburant --</option>
                                    {fuels.map(fuel => (
                                        <option key={fuel.id} value={fuel.id}>{fuel.fuel}</option>
                                    ))}
                                </select>
                                {errors.fuel_id && <span className="error">{errors.fuel_id}</span>}
                            </div>
                            
                            {fuels.find(f => f.id == data.fuel_id)?.fuel !== 'Electrique' &&
                             <div className="form-group">
                                <label>Cylindrée</label>
                                <select 
                                    value={data.cylindree} 
                                    onChange={e => setData('cylindree', e.target.value)}
                                    disabled={fuels.find(f => f.id == data.fuel_id)?.fuel === 'Electrique'}
                                >
                                    <option value="1l">1l</option>
                                    <option value="1.2l">1.2l</option>
                                    <option value="1.5l">1.5l</option>
                                    <option value="1.8l">1.8l</option>
                                    <option value="2l">2l</option>
                                    <option value="3l">3l</option>
                                    <option value="NONE">NONE</option>
                                </select>
                                {errors.cylindree && <span className="error">{errors.cylindree}</span>}
                                {fuels.find(f => f.id == data.fuel_id)?.fuel === 'Electrique' && (
                                    <small className="helper-text">Automatiquement défini sur NONE pour les véhicules électriques</small>
                                )}
                            </div>}
                           
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Type de véhicule *</label>
                                <select 
                                    value={data.type} 
                                    onChange={e => setData('type', e.target.value)}
                                >
                                    <option value="BERLINE">Berline</option>
                                    <option value="SUV">SUV</option>
                                    <option value="4X4">4X4</option>
                                    <option value="BREAK">Break</option>
                                    <option value="LUDOSPACE">Ludospace</option>
                                    <option value="VAN">Van</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Jantes *</label>
                                <select 
                                    value={data.jantes} 
                                    onChange={e => setData('jantes', e.target.value)}
                                >
                                    <option value="16">16 pouces</option>
                                    <option value="17">17 pouces</option>
                                    <option value="18">18 pouces</option>
                                    <option value="19">19 pouces</option>
                                    <option value="NONE">Non spécifié</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Sellerie *</label>
                                <select 
                                    value={data.sellerie} 
                                    onChange={e => setData('sellerie', e.target.value)}
                                >
                                    <option value="Tissus">Tissus</option>
                                    <option value="Cuir">Cuir</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Couleur *</label>
                                <input 
                                    type="color" 
                                    value={data.couleur}
                                    onChange={e => setData('couleur', e.target.value)}
                                />
                                <span className="color-display">{data.couleur}</span>
                                {errors.couleur && <span className="error">{errors.couleur}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="checkbox-label">
                                <input 
                                    type="checkbox" 
                                    checked={data.abs}
                                    onChange={e => setData('abs', e.target.checked)}
                                />
                                ABS (système de freinage antiblocage)
                            </label>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Photos du véhicule</h2>
                        <p className="section-description">Ajoutez des photos de qualité pour attirer plus d'acheteurs</p>
                        
                        {[1, 2, 3, 4].map(num => (
                            <div key={num} className="image-upload-group">
                                <label>Photo {num} {num === 1 ? '(obligatoire)' : '(optionnelle)'}</label>
                                
                                <div className="image-type-selector">
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`imageType${num}`}
                                            checked={imageTypes[`image${num}`] === 'file'}
                                            onChange={() => handleImageTypeChange(num, 'file')}
                                        />
                                        Uploader un fichier
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name={`imageType${num}`}
                                            checked={imageTypes[`image${num}`] === 'url'}
                                            onChange={() => handleImageTypeChange(num, 'url')}
                                        />
                                        Lien URL
                                    </label>
                                </div>

                                {imageTypes[`image${num}`] === 'file' ? (
                                    <input 
                                        type="file" 
                                        accept="image/jpeg,image/png,image/jpg,image/gif"
                                        onChange={e => handleFileChange(num, e.target.files[0])}
                                        required={num === 1}
                                    />
                                ) : (
                                    <input 
                                        type="url" 
                                        value={data[`image${num}_path`]}
                                        onChange={e => setData(`image${num}_path`, e.target.value)}
                                        placeholder={`https://exemple.com/photo${num}.jpg`}
                                        required={num === 1}
                                    />
                                )}
                                
                                {errors[`image${num}_path`] && <span className="error">{errors[`image${num}_path`]}</span>}
                                {errors[`image${num}_file`] && <span className="error">{errors[`image${num}_file`]}</span>}
                            </div>
                        ))}
                    </div>

                    <div className="form-section">
                        <h2>Description</h2>
                        
                        <div className="form-group">
                            <label>Décrivez votre véhicule *</label>
                            <textarea 
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows="6"
                                placeholder="Décrivez l'état du véhicule, ses équipements, son historique, pourquoi vous le vendez..."
                                required
                            />
                            {errors.description && <span className="error">{errors.description}</span>}
                        </div>
                    </div>

                    <button type="submit" disabled={processing} className="submit-btn">
                        {processing ? 'Publication en cours...' : 'Publier mon annonce'}
                    </button>
                </form>
            </div>
        </div>
    )
}

