import jwt from 'jsonwebtoken';

import db from '../../sequelize/models';

const { Location } = db;

class LocationController {
    static async getAllLocations(req, res) {
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token.startsWith('Bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                if(err) {
                    return res.status(400).send({
                        success: false,
                        message: 'Invalid token'
                    })
                } else {
                    req.decoded = decoded;
                    await Location.findAll().then(data => {
                        if(data.length > 0) {
                            return res.status(200).json({
                                success: true,
                                messages: data
                            })
                        }
                        return res.status(400).json({
                            success: false,
                            message: 'No messages at the moment'
                        })
                    })
                }
            });
        }
    }

    static async getLocationById(req, res) {
        const { location } = req.params;
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token.startsWith('Bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                if(err) {
                    return res.status(400).send({
                        success: false,
                        message: 'Invalid token'
                    })
                } else {
                    req.decoded = decoded;
                    await Location.findAll({
                        where: {
                            name: location
                        }
                    }).then(data => {
                        if(data.length > 0) {
                            console.log(data)
                            return res.status(200).json({
                                success: true,
                                messages: data
                            })
                        }
                        return res.status(400).json({
                            success: false,
                            message: 'No Location with that name'
                        })
                    })
                }
            });
        }
    }

    static async updateLocation(req, res) {
        const { location } = req.params;
        const { locationName, femalePopulation, malePopulation, under18Population, over18Population } = req.body;
        const totalPopulation = malePopulation + femalePopulation;
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token.startsWith('Bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                if(err) {
                    return res.status(400).send({
                        success: false,
                        message: 'Invalid token'
                    })
                } else {
                    req.decoded = decoded;
                    await Location.update(
                        {
                        name: locationName,
                        females: femalePopulation,
                        male: malePopulation,
                        under18: under18Population,
                        over18: over18Population,
                        totalResidents: totalPopulation
                        },
                        {
                            where: {
                                name: location
                            }
                        }
                    ).then(data => {
                        if(data.length > 0) {
                            console.log(data)
                            return res.status(201).json({
                                success: true,
                                messages: "Location Updated successfully"
                            })
                        }
                        return res.status(400).json({
                            success: false,
                            message: 'No Location with that name'
                        })
                    })
                }
            });
        }
    }

    static async deleteLocation(req, res) {
        const { location } = req.params;
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token.startsWith('Bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                if(err) {
                    return res.status(400).send({
                        success: false,
                        message: 'Invalid token'
                    })
                } else {
                    req.decoded = decoded;
                    try {
                        const deleteLocation = await Location.destroy({ returning: true, where: { name: location }});
                        if (!deleteLocation) return res.status(404).json({
                            error: 'Location not found!'
                        });
                        return res.status(200).json({
                            message: 'Location deleted successfully!',
                            deleteLocation
                        });
                    } catch (error) {
                        return res.status(500).json({
                            error: 'An error occurred when trying to delete the Location!'
                          });
                    }
                }
            });
        }
    }

    static async createNewLocation(req, res) {
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

        const { locationName, femalePopulation, malePopulation, under18Population, over18Population } = req.body;
        const totalPopulation = malePopulation + femalePopulation;

        if (token.startsWith('Bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                if(err) {
                    return res.status(400).send({
                        success: false,
                        message: 'Invalid token'
                    })
                } else {
                    req.decoded = decoded;
                    const checkLocation = await Location.findAll({
                        where: {
                            name: locationName
                        }
                    });
                    if(checkLocation.length > 0) {
                        return res.status(400).json({
                            success: false,
                            message: 'Location exists.You can update it'
                        })
                    }
                    const newLocation = await Location.create({
                        name: locationName,
                        females: femalePopulation,
                        male: malePopulation,
                        under18: under18Population,
                        over18: over18Population,
                        totalResidents: totalPopulation
                    });
                    if(newLocation) {
                        return res.status(201).json({
                            success: true,
                            message: 'Location created successfully'
                        })
                    }
                    return res.status(400).json({
                        success: false,
                        message: 'An error occurred while creating the location'
                    })
                }
            });
        }
    }
    
}

export default LocationController;